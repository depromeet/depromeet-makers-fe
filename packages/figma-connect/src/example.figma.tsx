import { figma } from '@figma/code-connect';

const Example = ({ title, hasDescription }: { title: string; hasDescription?: boolean }) => {
  return <button>{`${title}${hasDescription ? 'description' : ''}`}</button>;
};

figma.connect(Example, '<DESIGN_SYSTEM_BASE>?node-id=326-1786&t=wqsmm4JvNMosqGmX-4', {
  props: {
    title: figma.string('title'),
    hasDescription: figma.boolean('hasDescription?'),
  },
  example: ({ title, hasDescription }) => <Example title={title} hasDescription={hasDescription} />,
});
