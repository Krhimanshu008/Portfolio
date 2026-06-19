import React, { useState, useEffect } from 'react';
import { timelineData, skillCategories } from '../data/journeyData';

const TimelinePanel = ({ activeGlobeNode, activeTimelineId, interactionSource, onTimelineClick }) => {
  // Auto-scroll when globe is clicked and a timeline entry is selected
  useEffect(() => {
    if (interactionSource === 'globe' && activeTimelineId) {
      const element = document.getElementById(`timeline-${activeTimelineId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeTimelineId, interactionSource]);

  return (
    <div className="timeline-panel">
      <div className="timeline-line"></div>
      
      {timelineData.map((item) => {
        const categoryColor = skillCategories[item.categoryId].color;
        const isExpanded = activeTimelineId === item.id;
        
        let isActive = false;
        let isDimmed = false;

        if (interactionSource === 'globe' && activeGlobeNode) {
          const nodeLabelLower = activeGlobeNode.label.toLowerCase();
          isActive = item.tags.some(tag => {
            const tagLower = tag.toLowerCase();
            return tagLower.includes(nodeLabelLower) || 
                   nodeLabelLower.includes(tagLower) ||
                   (nodeLabelLower === "stat audit" && tagLower.includes("audit"));
          });
          isDimmed = !isActive;
        } else if (interactionSource === 'timeline') {
          isActive = activeTimelineId === item.id;
          isDimmed = activeTimelineId !== null && !isActive;
        }

        return (
          <div 
            key={item.id} 
            id={`timeline-${item.id}`}
            className={`timeline-entry ${isExpanded ? 'expanded' : ''} ${isDimmed ? 'dimmed' : ''}`}
            onClick={() => onTimelineClick(item.id)}
          >
            {/* Timeline Dot */}
            <div 
              className="timeline-dot" 
              style={{ 
                backgroundColor: categoryColor,
                boxShadow: isActive ? `0 0 15px ${categoryColor}` : 'none',
                transform: isActive ? 'scale(1.3)' : 'scale(1)'
              }}
            ></div>

            {/* Timeline Content */}
            <div 
              className="timeline-content-card"
              style={{
                borderColor: isActive ? categoryColor : 'rgba(255, 255, 255, 0.1)',
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)'
              }}
            >
              <div className="timeline-header">
                <h4 style={{ color: isActive ? '#fff' : '#ccc' }}>{item.title}</h4>
                <span className="timeline-date" style={{ color: categoryColor }}>{item.date}</span>
              </div>
              
              {/* Expandable Body */}
              <div 
                className="timeline-body"
                style={{ 
                  maxHeight: isExpanded ? '500px' : '0px', 
                  opacity: isExpanded ? 1 : 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  marginTop: isExpanded ? '15px' : '0px'
                }}
              >
                <p>{item.description}</p>
                
                {item.bulletPoints && item.bulletPoints.length > 0 && (
                  <ul style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.9rem', 
                    paddingLeft: '20px', 
                    marginBottom: '15px',
                    lineHeight: '1.5'
                  }}>
                    {item.bulletPoints.map((bp, i) => (
                      <li key={i} style={{ marginBottom: '6px' }}>{bp}</li>
                    ))}
                  </ul>
                )}

                <div className="timeline-tags">
                  {item.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="tag-pill"
                      style={{ 
                        border: `1px solid ${categoryColor}40`,
                        color: categoryColor,
                        backgroundColor: `${categoryColor}10`
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelinePanel;
