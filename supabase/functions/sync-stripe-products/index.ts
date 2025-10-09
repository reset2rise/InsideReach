import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import Stripe from 'npm:stripe@14.11.0';
import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY not configured');
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2024-11-20.acacia',
    });

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
      limit: 100,
    });

    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    const productsToInsert = [];
    const servicesToInsert = [];

    for (const product of products.data) {
      const defaultPrice = product.default_price;
      if (!defaultPrice || typeof defaultPrice === 'string') continue;

      const priceAmount = defaultPrice.unit_amount ? (defaultPrice.unit_amount / 100).toFixed(2) : '0.00';
      
      const item = {
        name: product.name,
        description: product.description || '',
        price: priceAmount,
        stripe_product_id: product.id,
        stripe_price_id: defaultPrice.id,
        image_url: product.images && product.images.length > 0 ? product.images[0] : null,
        active: product.active,
      };

      const isService = product.metadata?.type === 'service' || 
                       product.name.toLowerCase().includes('counseling') ||
                       product.name.toLowerCase().includes('coaching') ||
                       product.name.toLowerCase().includes('workshop') ||
                       product.name.toLowerCase().includes('retreat') ||
                       product.name.toLowerCase().includes('training') ||
                       product.name.toLowerCase().includes('mentorship') ||
                       product.name.toLowerCase().includes('program');

      if (isService) {
        servicesToInsert.push(item);
      } else {
        productsToInsert.push(item);
      }
    }

    if (productsToInsert.length > 0) {
      const { error: productsError } = await supabase.from('products').insert(productsToInsert);
      if (productsError) throw productsError;
    }

    if (servicesToInsert.length > 0) {
      const { error: servicesError } = await supabase.from('services').insert(servicesToInsert);
      if (servicesError) throw servicesError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        synced: {
          products: productsToInsert.length,
          services: servicesToInsert.length,
          total: products.data.length,
        },
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error syncing Stripe products:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});