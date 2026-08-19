import type { ReactNode } from 'react';

type Tone = 'info' | 'warn' | 'danger' | 'success';

interface NoteProps {
  tone?: Tone;
  title: string;
  children: ReactNode;
}

export default function Note({ tone = 'info', title, children }: NoteProps) {
  return (
    <aside className={`note note--${tone}`}>
      <div className="note__title">{title}</div>
      <div className="note__body">{children}</div>
    </aside>
  );
}
