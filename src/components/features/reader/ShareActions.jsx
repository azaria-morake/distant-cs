import styled from 'styled-components';
import { Share } from 'lucide-react';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  font-size: 0.9rem;
`;

export default function ShareActions({ title }) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share canceled');
      }
    } else {
      // Fallback for desktop: copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard');
    }
  };

  return (
    <Container>
      <Button onClick={handleShare}>
        <Share size={16} />
        Share
      </Button>
    </Container>
  );
}
