import LifestyleForm from '../LifestyleForm';

export default function LifestyleFormExample() {
  return (
    <LifestyleForm 
      onSubmit={(data) => console.log('Form submitted:', data)}
      onBack={() => console.log('Back clicked')}
    />
  );
}
