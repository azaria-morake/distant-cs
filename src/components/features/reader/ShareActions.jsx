import React from 'react';
import ShareButton from '../../ui/ShareButton';

const ShareActions = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  return <ShareButton onClick={handleShare} />;
};

export default ShareActions;
