import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useTranslation } from '../hooks/useTranslation';

interface ContentItem {
  id: string;
  type: 'businessInfo' | 'tutorial' | 'presentation' | 'calculator';
  title: { [key: string]: string };
  description: { [key: string]: string };
}

const ContentManager: React.FC = () => {
  const { t } = useTranslation();
  const [contentItems, setContentItems] = useState<ContentItem[]>([
    {
      id: '1',
      type: 'businessInfo',
      title: { en: 'About Us', it: 'Chi Siamo' },
      description: { en: 'Company description', it: 'Descrizione dell\'azienda' },
    },
    {
      id: '2',
      type: 'tutorial',
      title: { en: 'Getting Started', it: 'Iniziare' },
      description: { en: 'Learn the basics', it: 'Impara le basi' },
    },
  ]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(contentItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setContentItems(items);
  };

  const handleContentChange = (id: string, lang: string, field: 'title' | 'description', value: string) => {
    setContentItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, [field]: { ...item[field], [lang]: value } }
          : item
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t('contentManagement')}</h2>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="content-list">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {contentItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="bg-white p-4 mb-4 rounded-lg shadow"
                    >
                      <h3 className="text-lg font-semibold mb-2">{t(item.type)}</h3>
                      {['en', 'it'].map(lang => (
                        <div key={lang} className="mb-2">
                          <input
                            type="text"
                            value={item.title[lang] || ''}
                            onChange={(e) => handleContentChange(item.id, lang, 'title', e.target.value)}
                            placeholder={`${t('title')} (${lang})`}
                            className="w-full p-2 mb-1 border rounded"
                          />
                          <textarea
                            value={item.description[lang] || ''}
                            onChange={(e) => handleContentChange(item.id, lang, 'description', e.target.value)}
                            placeholder={`${t('description')} (${lang})`}
                            className="w-full p-2 border rounded"
                            rows={2}
                          />
                        </div>
                      ))}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        {t('saveChanges')}
      </button>
    </div>
  );
};

export default ContentManager;