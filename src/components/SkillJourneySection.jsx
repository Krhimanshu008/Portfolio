import React, { useState } from 'react';
import SkillGlobe3D from './SkillGlobe3D';
import TimelinePanel from './TimelinePanel';

import { timelineData } from '../data/journeyData';

const SkillJourneySection = () => {
  const [activeGlobeNode, setActiveGlobeNode] = useState(null);
  const [activeTimelineId, setActiveTimelineId] = useState(null);
  const [interactionSource, setInteractionSource] = useState(null);

  const handleGlobeClick = (node) => {
    if (activeGlobeNode && activeGlobeNode.id === node.id) {
      setActiveGlobeNode(null);
      setActiveTimelineId(null);
      setInteractionSource(null);
      return;
    }

    setActiveGlobeNode(node);
    setInteractionSource('globe');
    
    // Find the first timeline entry matching this skill to auto-expand
    const nodeLabelLower = node.label.toLowerCase();
    const matchingEntry = timelineData.find(item => 
      item.tags.some(tag => {
        const tagLower = tag.toLowerCase();
        // Check for specific substrings (e.g. "Stat Audit" in "Statutory Audit")
        return tagLower.includes(nodeLabelLower) || 
               nodeLabelLower.includes(tagLower) ||
               (nodeLabelLower === "stat audit" && tagLower.includes("audit"));
      })
    );
    setActiveTimelineId(matchingEntry ? matchingEntry.id : null);
  };

  const handleTimelineClick = (timelineId) => {
    if (activeTimelineId === timelineId) {
      // Toggle off if clicking the already open one
      setActiveGlobeNode(null);
      setActiveTimelineId(null);
      setInteractionSource(null);
    } else {
      setActiveTimelineId(timelineId);
      setInteractionSource('timeline');
    }
  };

  return (
    <section className="journey-section">
      <div className="journey-header">
        <h3>Education & Skill Journey</h3>
        <p>Interactive exploration of domains and tools learned over time.</p>
      </div>
      
      <div className="journey-layout">
        {/* Left Panel - 35% */}
        <div className="journey-left">
          <div className="globe-info-wrapper">
            <div className="info-icon-container">
              <span className="info-icon">i</span>
              <div className="globe-info-tooltip">
                <ul>
                  <li>Auto-rotates slowly</li>
                  <li>Drag to spin</li>
                  <li>Click node &rarr; opens detail</li>
                </ul>
              </div>
            </div>
          </div>
          <SkillGlobe3D 
            activeGlobeNode={activeGlobeNode} 
            activeTimelineId={activeTimelineId}
            interactionSource={interactionSource}
            onNodeClick={handleGlobeClick} 
          />
        </div>

        {/* Right Panel - 65% */}
        <div className="journey-right">
          <TimelinePanel 
            activeGlobeNode={activeGlobeNode} 
            activeTimelineId={activeTimelineId}
            interactionSource={interactionSource}
            onTimelineClick={handleTimelineClick} 
          />
        </div>
      </div>
    </section>
  );
};

export default SkillJourneySection;
