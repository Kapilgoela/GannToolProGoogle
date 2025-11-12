import React from 'react';

interface SeoHeadProps {
  title: string;
  description: string;
  schema?: object;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title, description, schema }) => {
    React.useEffect(() => {
        document.title = title;
        
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', description);

        // Remove existing schema scripts to prevent duplicates on navigation
        document.querySelectorAll('script[type="application/ld+json"]').forEach(e => e.remove());

        if (schema) {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.innerHTML = JSON.stringify(schema, null, 2); // Pretty print for easier debugging
            document.head.appendChild(script);
        }

        return () => {
             // Clean up schema on component unmount
             document.querySelectorAll('script[type="application/ld+json"]').forEach(e => e.remove());
        }
    }, [title, description, schema]);

    // This component renders nothing to the DOM itself
    return null;
}

export default SeoHead;
