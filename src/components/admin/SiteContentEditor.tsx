import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, AlertCircle, CheckCircle, Plus, Trash2, Link as LinkIcon } from 'lucide-react';

interface SiteSection {
  id: string;
  section_key: string;
  section_name: string;
  content: any;
  is_active: boolean;
  display_order: number;
}

interface NavigationLink {
  id: string;
  label: string;
  url: string;
  section_id: string;
  link_type: string;
  is_active: boolean;
  display_order: number;
}

export default function SiteContentEditor() {
  const [sections, setSections] = useState<SiteSection[]>([]);
  const [links, setLinks] = useState<NavigationLink[]>([]);
  const [selectedSection, setSelectedSection] = useState<SiteSection | null>(null);
  const [editedContent, setEditedContent] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'links'>('content');

  useEffect(() => {
    loadSections();
    loadLinks();
  }, []);

  const loadSections = async () => {
    try {
      const { data, error } = await supabase
        .from('site_sections')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setSections(data || []);
      if (data && data.length > 0) {
        setSelectedSection(data[0]);
        setEditedContent(data[0].content);
      }
    } catch (error: any) {
      showMessage('error', `Error loading sections: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const loadLinks = async () => {
    try {
      const { data, error } = await supabase
        .from('navigation_links')
        .select('*')
        .order('display_order');

      if (error) throw error;
      setLinks(data || []);
    } catch (error: any) {
      showMessage('error', `Error loading links: ${error.message}`);
    }
  };

  const handleSectionSelect = (section: SiteSection) => {
    setSelectedSection(section);
    setEditedContent(section.content);
  };

  const handleContentChange = (path: string, value: any) => {
    const keys = path.split('.');
    const newContent = JSON.parse(JSON.stringify(editedContent));

    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    setEditedContent(newContent);
  };

  const handleSaveContent = async () => {
    if (!selectedSection) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('site_sections')
        .update({ content: editedContent })
        .eq('id', selectedSection.id);

      if (error) throw error;

      showMessage('success', 'Content saved successfully!');
      await loadSections();
    } catch (error: any) {
      showMessage('error', `Error saving content: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleAddLink = async () => {
    try {
      const { error } = await supabase
        .from('navigation_links')
        .insert({
          label: 'New Link',
          url: '#',
          link_type: 'internal',
          display_order: links.length
        });

      if (error) throw error;
      showMessage('success', 'Link added successfully!');
      await loadLinks();
    } catch (error: any) {
      showMessage('error', `Error adding link: ${error.message}`);
    }
  };

  const handleUpdateLink = async (link: NavigationLink) => {
    try {
      const { error } = await supabase
        .from('navigation_links')
        .update(link)
        .eq('id', link.id);

      if (error) throw error;
      showMessage('success', 'Link updated successfully!');
    } catch (error: any) {
      showMessage('error', `Error updating link: ${error.message}`);
    }
  };

  const handleDeleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      const { error } = await supabase
        .from('navigation_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      showMessage('success', 'Link deleted successfully!');
      await loadLinks();
    } catch (error: any) {
      showMessage('error', `Error deleting link: ${error.message}`);
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const renderContentField = (key: string, value: any, path: string = key) => {
    if (typeof value === 'string') {
      return (
        <div key={path} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {key.replace(/_/g, ' ')}
          </label>
          {value.length > 100 ? (
            <textarea
              value={value}
              onChange={(e) => handleContentChange(path, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={4}
            />
          ) : (
            <input
              type="text"
              value={value}
              onChange={(e) => handleContentChange(path, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          )}
        </div>
      );
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      return (
        <div key={path} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 capitalize">{key.replace(/_/g, ' ')}</h4>
          {Object.entries(value).map(([subKey, subValue]) =>
            renderContentField(subKey, subValue, `${path}.${subKey}`)
          )}
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={path} className="mb-4 p-4 border border-gray-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 capitalize">{key.replace(/_/g, ' ')}</h4>
          {value.map((item, index) => (
            <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Item {index + 1}</h5>
              {typeof item === 'object' && Object.entries(item).map(([subKey, subValue]) =>
                renderContentField(subKey, subValue, `${path}.${index}.${subKey}`)
              )}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Site Content Editor</h2>
        <p className="text-gray-600 mt-1">Edit content and manage navigation links for your website</p>
      </div>

      {message && (
        <div className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-2 px-1 font-medium transition ${
              activeTab === 'content'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Site Content
          </button>
          <button
            onClick={() => setActiveTab('links')}
            className={`pb-2 px-1 font-medium transition ${
              activeTab === 'links'
                ? 'border-b-2 border-green-600 text-green-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Navigation Links
          </button>
        </div>
      </div>

      {activeTab === 'content' ? (
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3 bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Sections</h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionSelect(section)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedSection?.id === section.id
                      ? 'bg-green-50 text-green-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {section.section_name}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-9 bg-white rounded-lg shadow-md p-6">
            {selectedSection ? (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{selectedSection.section_name}</h3>
                  <button
                    onClick={handleSaveContent}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>

                <div className="space-y-4">
                  {Object.entries(editedContent).map(([key, value]) =>
                    renderContentField(key, value)
                  )}
                </div>
              </>
            ) : (
              <p className="text-gray-500 text-center py-12">Select a section to edit</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Navigation Links</h3>
            <button
              onClick={handleAddLink}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-4 h-4" />
              Add Link
            </button>
          </div>

          <div className="space-y-4">
            {links.map((link) => (
              <div key={link.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-3">
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => {
                        const updated = { ...link, label: e.target.value };
                        setLinks(links.map(l => l.id === link.id ? updated : l));
                      }}
                      onBlur={() => handleUpdateLink(link)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Link Label"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => {
                        const updated = { ...link, url: e.target.value };
                        setLinks(links.map(l => l.id === link.id ? updated : l));
                      }}
                      onBlur={() => handleUpdateLink(link)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="URL or #section"
                    />
                  </div>
                  <div className="col-span-2">
                    <select
                      value={link.link_type}
                      onChange={(e) => {
                        const updated = { ...link, link_type: e.target.value };
                        setLinks(links.map(l => l.id === link.id ? updated : l));
                        handleUpdateLink(updated);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    >
                      <option value="internal">Internal</option>
                      <option value="external">External</option>
                      <option value="section">Section</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={link.is_active}
                        onChange={(e) => {
                          const updated = { ...link, is_active: e.target.checked };
                          setLinks(links.map(l => l.id === link.id ? updated : l));
                          handleUpdateLink(updated);
                        }}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">Active</span>
                    </label>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {links.length === 0 && (
              <p className="text-gray-500 text-center py-12">No navigation links yet. Add your first link!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
