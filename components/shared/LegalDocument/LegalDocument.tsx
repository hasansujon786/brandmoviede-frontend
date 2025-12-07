export type LegalContent = string | string[] | { [key: string]: LegalContent };

export interface LegalDocumentProps<T extends Record<string, LegalContent>> {
  data: T;
}

function LegalDocument<T extends Record<string, LegalContent>>({
  data,
}: LegalDocumentProps<T>) {
  function formatSectionTitle(key: string) {
    return key;
  }

  function formatSubTitle(key: string) {
    return key;
  }

  function renderContent(content: LegalContent) {
    if (typeof content === "string") return <p>{content}</p>;

    if (Array.isArray(content))
      return content.map((item, index) => <p key={index}>{item}</p>);

    if (typeof content === "object")
      return Object.entries(content).map(([key, value], idx) => (
        <div key={idx} className="mt-4">
          <h3 className="text-heading-100 font-medium capitalize">
            {formatSubTitle(key)}
          </h3>
          <div className="mt-1 space-y-1">
            {Array.isArray(value)
              ? value.map((item, index) => (
                  <li key={index} className="ml-5 list-disc">
                    {item}
                  </li>
                ))
              : renderContent(value)}
          </div>
        </div>
      ));

    return null;
  }

  return (
    <div className="bg-card mx-auto mt-12 rounded-2xl p-8">
      <div className="space-y-10">
        {Object.entries(data).map(([key, content], idx) => (
          <section key={idx} className="space-y-4">
            <h2 className="text-heading-100 text-lg font-semibold capitalize">
              {formatSectionTitle(key)}
            </h2>

            <div className="space-y-2 leading-relaxed">
              {renderContent(content)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default LegalDocument
