import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, ChevronLeft, ChevronRight, Layers } from "lucide-react";

interface Flashcard {
  front: string;
  back: string;
}

const FlashcardCreator = () => {
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    
    // Simulate AI API call with demo flashcard generation
    setTimeout(() => {
      const demoFlashcards = [
        {
          front: "What is Artificial Intelligence?",
          back: "AI is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction."
        },
        {
          front: "Machine Learning Definition",
          back: "A subset of AI that provides systems the ability to automatically learn and improve from experience without being explicitly programmed."
        },
        {
          front: "Neural Networks",
          back: "Computing systems inspired by biological neural networks. They consist of interconnected nodes (neurons) that process information through weighted connections."
        },
        {
          front: "Deep Learning",
          back: "A subset of machine learning that uses neural networks with multiple layers to model and understand complex patterns in data."
        },
        {
          front: "Natural Language Processing (NLP)",
          back: "A branch of AI that helps computers understand, interpret, and manipulate human language in a valuable way."
        }
      ];
      
      setFlashcards(demoFlashcards);
      setCurrentCard(0);
      setIsFlipped(false);
      setLoading(false);
    }, 2000);
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-secondary" />
          Flashcard Creator
        </CardTitle>
        <CardDescription>
          Transform your study material into interactive flashcards for better memorization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Enter your study material, definitions, concepts, or any content you want to convert into flashcards..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        
        <Button 
          onClick={generateFlashcards} 
          disabled={!inputText.trim() || loading}
          className="w-full"
          variant="secondary"
        >
          {loading ? "Creating Flashcards..." : "Create Flashcards"}
        </Button>

        {flashcards.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Flashcards</h3>
              <Badge variant="outline">
                {currentCard + 1} of {flashcards.length}
              </Badge>
            </div>
            
            <div className="relative">
              <Card 
                className="min-h-[200px] cursor-pointer transition-all duration-300 hover:shadow-md"
                onClick={flipCard}
              >
                <CardContent className="flex items-center justify-center p-6 h-full">
                  <div className="text-center">
                    <div className="mb-4">
                      <Badge variant={isFlipped ? "secondary" : "default"}>
                        {isFlipped ? "Answer" : "Question"}
                      </Badge>
                    </div>
                    <p className="text-lg leading-relaxed">
                      {isFlipped ? flashcards[currentCard].back : flashcards[currentCard].front}
                    </p>
                    <div className="mt-4 flex items-center justify-center">
                      <RotateCcw className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground ml-2">
                        Click to flip
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={prevCard}
                disabled={currentCard === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <Button
                variant="outline"
                onClick={nextCard}
                disabled={currentCard === flashcards.length - 1}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FlashcardCreator;