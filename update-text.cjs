const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'App.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="flex flex-col gap-8 md:gap-12">[\s\S]*?<\/div>/;

const newContent = `<div className="flex flex-col gap-6 md:gap-10">
            <KineticText
              text="The only enemy you face is your uncontrolled mind, not people, not failure, not even fear. Just you on autopilot. Because when the mind runs wild, it turns shadows into monsters and doubts into truths. You start fighting things that don’t exist conversations that never happened, futures that haven't arrived."
              className="text-[20px] font-bold leading-[1.3] tracking-tight text-elevate-paper md:text-[28px] lg:text-[36px]"
            />
            <KineticText
              text="An untrained mind is a brilliant liar. It mimics your voice, wears your thoughts, and convinces you to stay small."
              className="text-[20px] font-bold leading-[1.3] tracking-tight text-elevate-paper/80 md:text-[28px] lg:text-[36px]"
            />
            <KineticText
              text="But when you take control, real control, everything shifts. You stop reacting you start choosing. You stop panicking you start planning. The world doesn’t get easier you get stronger."
              className="text-[20px] font-bold leading-[1.3] tracking-tight text-elevate-paper/80 md:text-[28px] lg:text-[36px]"
            />
            <KineticText
              text="Train the mind, or it trains you. That’s not self-help that’s strategy."
              className="text-[20px] font-black leading-[1.3] tracking-tight text-elevate-primary md:text-[28px] lg:text-[36px]"
            />
          </div>`;

if (content.match(regex)) {
  content = content.replace(regex, newContent);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully decreased font size and removed colons and semicolons.');
} else {
  console.log('Could not find the target code to replace.');
}
