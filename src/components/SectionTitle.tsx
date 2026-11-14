import Reveal from './Reveal';
type SectionTitleProps = { eyebrow: string; title: string; accent?: string; description?: string };
export default function SectionTitle({ eyebrow, title, accent, description }: SectionTitleProps) {
  return <Reveal><div className="section-heading"><span className="section-eyebrow"><i /> {eyebrow}</span><div className="section-heading-row"><h2>{title} {accent && <em>{accent}</em>}</h2>{description && <p>{description}</p>}</div></div></Reveal>;
}
