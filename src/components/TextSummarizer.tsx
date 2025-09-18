import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, CheckCircle } from "lucide-react";

const TextSummarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [keyPoints, setKeyPoints] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSummary = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    
    // Simulate AI API call with demo summary generation
    setTimeout(() => {
      const demoSummary = `
        This text discusses the transformative impact of Artificial Intelligence (AI) on modern education systems. 
        AI technologies are revolutionizing how students learn by providing personalized learning experiences, 
        automated assessment tools, and intelligent tutoring systems. The integration of AI in education helps 
        address individual learning needs, improves accessibility, and enhances overall educational outcomes.
      `.trim();
      
      const demoKeyPoints = [
        "AI is transforming educational methodologies and approaches",
        "Personalized learning experiences are now possible through AI algorithms",
        "Automated assessment tools reduce teacher workload and provide instant feedback",
        "Intelligent tutoring systems adapt to individual student needs",
        "AI improves accessibility for students with diverse learning requirements",
        "Educational outcomes are enhanced through data-driven insights"
      ];
      
      setSummary(demoSummary);
      setKeyPoints(demoKeyPoints);
      setLoading(false);
    }, 2000);
  };

  const copyToClipboard = async () => {
    const textToCopy = `Summary:\n${summary}\n\nKey Points:\n${keyPoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).length;
  };

  const getCompressionRatio = () => {
    if (!inputText || !summary) return 0;
    const originalWords = getWordCount(inputText);
    const summaryWords = getWordCount(summary);
    return Math.round(((originalWords - summaryWords) / originalWords) * 100);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent" />
          Text Summarizer
        </CardTitle>
        <CardDescription>
          Get concise summaries and key points from long texts, articles, or study materials
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Input Text</label>
            {inputText && (
              <Badge variant="outline">
                {getWordCount(inputText)} words
              </Badge>
            )}
          </div>
          <Textarea
            placeholder="Paste your long text, article, research paper, or study material here to get a concise summary..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={6}
            className="resize-none"
          />
        </div>
        
        <Button 
          onClick={generateSummary} 
          disabled={!inputText.trim() || loading}
          className="w-full"
          variant="default"
        >
          {loading ? "Generating Summary..." : "Generate Summary"}
        </Button>

        {summary && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Summary & Key Points</h3>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {getCompressionRatio()}% shorter
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                >
                  {copied ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>
            
            <Card className="border-accent/20">
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed text-muted-foreground">
                  {summary}
                </p>
                <div className="mt-3">
                  <Badge variant="outline">
                    {getWordCount(summary)} words
                  </Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-secondary/20">
              <CardHeader>
                <CardTitle className="text-base">Key Points</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-0.5 text-xs px-2 py-1">
                        {index + 1}
                      </Badge>
                      <span className="text-sm leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TextSummarizer;