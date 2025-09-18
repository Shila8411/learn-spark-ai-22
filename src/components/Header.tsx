import { BookOpen, Brain, Lightbulb } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-primary text-primary-foreground py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <Brain className="h-8 w-8" />
          <h1 className="text-3xl font-bold">StudyBuddy AI</h1>
        </div>
        <p className="text-primary-foreground/80 max-w-2xl">
          Your intelligent study companion powered by AI. Transform your learning with smart quizzes, 
          flashcards, and summaries generated from your study materials.
        </p>
        <div className="flex items-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span>Quality Education (UN SDG 4)</span>
          </div>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            <span>AI-Powered Learning</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;