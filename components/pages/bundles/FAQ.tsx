import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const questions = [
  {
    title: "How will I receive my coins?",
    contents: [
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse debitis eaque voluptatum dolorum Odio nemo odio eius fuga tempore doloribus consequuntur ab.  ",
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse",
    ],
  },
  {
    title: "Do coins expire?",
    contents: [
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse debitis eaque voluptatum dolorum Odio nemo odio eius fuga tempore doloribus consequuntur ab.  ",
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse",
    ],
  },
  {
    title: "Can I get a refund?",
    contents: [
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse debitis eaque voluptatum dolorum Odio nemo odio eius fuga tempore doloribus consequuntur ab.  ",
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse",
    ],
  },
  {
    title: "What can I use coins for?",
    contents: [
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse debitis eaque voluptatum dolorum Odio nemo odio eius fuga tempore doloribus consequuntur ab.  ",
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse",
    ],
  },
  {
    title: "Is it safe to buy coins here?",
    contents: [
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse debitis eaque voluptatum dolorum Odio nemo odio eius fuga tempore doloribus consequuntur ab.  ",
      "Adipisicing ducimus distinctio fugit unde obcaecati Quidem quod assumenda suscipit tenetur quae eius Harum esse",
    ],
  },
];

export function FAQ() {
  return (
    <div>
      <SectionHeading
        h2
        eyebrow="Frequently Asked Questions"
        description="Get the answers you need to power up your experience. Everything from purchasing coins to event tickets is covered below."
      >
        How Can We <span className="text-primary">Help?</span>
      </SectionHeading>

      <Accordion type="single" collapsible className="grid w-full gap-6 mt-12">
        {questions.map((item) => (
          <AccordionItem key={item.title} value={item.title}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {item.contents.map((content, index) => (
                <p key={index}>{content}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
