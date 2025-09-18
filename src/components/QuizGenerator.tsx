import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Zap } from "lucide-react";

const QuizGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [quiz, setQuiz] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    
    // Simulate AI API call with demo quiz generation
    setTimeout(() => {
      const demoQuiz = [
        {
          question: "What is the main concept discussed in the text?",
          options: ["Machine Learning", "Artificial Intelligence", "Data Science", "Programming"],
          correct: 1
        },
        {
          question: "Which technology is mentioned as being transformative?",
          options: ["Blockchain", "AI", "Cloud Computing", "IoT"],
          correct: 1
        },
        {
          question: "What field benefits most from this technology?",
          options: ["Education", "Healthcare", "Finance", "All of the above"],
          correct: 3
        }
      ];
      
      setQuiz(demoQuiz);
      setSelectedAnswers({});
      setShowResults(false);
      setLoading(false);
    }, 2000);
  };

  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const getScore = () => {
    let correct = 0;
    quiz.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Quiz Generator
        </CardTitle>
        <CardDescription>
          Paste your study material and get an instant quiz to test your knowledge
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Paste your study notes, textbook content, or any text you want to create a quiz from..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>
        
        <Button 
          onClick={generateQuiz} 
          disabled={!inputText.trim() || loading}
          className="w-full"
        >
          {loading ? "Generating Quiz..." : "Generate Quiz"}
        </Button>

        {quiz.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Generated Quiz</h3>
              {showResults && (
                <Badge variant="secondary">
                  Score: {getScore()}/{quiz.length}
                </Badge>
              )}
            </div>
            
            {quiz.map((question, qIndex) => (
              <Card key={qIndex} className="border-muted">
                <CardContent className="pt-4">
                  <h4 className="font-medium mb-3">
                    {qIndex + 1}. {question.question}
                  </h4>
                  <div className="space-y-2">
                    {question.options.map((option: string, oIndex: number) => (
                      <div
                        key={oIndex}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedAnswers[qIndex] === oIndex
                            ? showResults
                              ? oIndex === question.correct
                                ? "bg-secondary border-secondary"
                                : "bg-destructive/10 border-destructive"
                              : "bg-accent border-accent"
                            : showResults && oIndex === question.correct
                              ? "bg-secondary border-secondary"
                              : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => selectAnswer(qIndex, oIndex)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {showResults && (
                            <>
                              {oIndex === question.correct && (
                                <CheckCircle className="h-4 w-4 text-secondary-foreground" />
                              )}
                              {selectedAnswers[qIndex] === oIndex && 
                               oIndex !== question.correct && (
                                <XCircle className="h-4 w-4 text-destructive" />
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {!showResults && Object.keys(selectedAnswers).length === quiz.length && (
              <Button onClick={checkAnswers} variant="secondary" className="w-full">
                Check Answers
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizGenerator;