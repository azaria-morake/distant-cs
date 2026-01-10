import styled from 'styled-components';

const Image = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.codeBackground};
`;

export default function PostHero({ src }) {
  return <Image $src={src} />;
}
