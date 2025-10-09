import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader } from 'lucide-react';

interface ContentItem {
  id: string;
  section_key: string;
  content_type: string;
  content_value: string;
}

export default function ContentManager() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const contentSections = [
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
    { key: 'mission_text', label: 'Mission Statement', type: 'text' },
    { key: 'vision_text', label: 'Vision Statement', type: 'text' },
    { key: 'about_title', label: 'About Title', type: 'text' },
    { key: 'about_text', label: 'About Description', type: 'text' },
    { key: 'cta_title', label: 'Call to Action Title', type: 'text' },
    { key: 'cta_subtitle', label: 'Call to Action Subtitle', type: 'text' },
  ];

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase.from('site_content').select('*');

      if (error) throw error;

      const contentMap: Record<string, string> = {};
      data?.forEach((item: ContentItem) => {
        contentMap[item.section_key] = item.content_value;
      });
      setContent(contentMap);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const { data: userData } = await supabase.auth.getUser();

      for (const section of contentSections) {
        const value = content[section.key] || '';

        const { error } = await supabase.from('site_content').upsert({
          section_key: section.key,
          content_type: section.type,
          content_value: value,
          updated_by: userData.user?.id,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'section_key'
        });

        if (error) throw error;
      }

      setMessage('Content saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error: any) {
      setMessage('Error saving content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Content</h1>
          <p className="text-gray-600 mt-2">Edit your homepage content</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition disabled:opacity-50"
        >
          {saving ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg ${
            message.includes('Error')
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}
        >
          {message}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-200">
        {contentSections.map((section) => (
          <div key={section.key} className="p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {section.label}
            </label>
            <textarea
              value={content[section.key] || ''}
              onChange={(e) => setContent({ ...content, [section.key]: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              placeholder={`Enter ${section.label.toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
