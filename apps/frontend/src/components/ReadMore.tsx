import { useState } from 'react';

export default function ReadMore({ content, length }: {
  content: string
  length: number
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedContent = `${content.slice(0, length)}...`;

  return (
    <>
      <p>
        {isExpanded
          ? content
          : truncatedContent
        }
      </p>
      {content.length > length && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 dark:text-blue-500 mt-0.5"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </>
  );
}
