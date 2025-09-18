import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import QuizGenerator from "@/components/QuizGenerator";
import FlashcardCreator from "@/components/FlashcardCreator";
import TextSummarizer from "@/components/TextSummarizer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Target, Rocket, Code } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Feature Overview */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-primary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-primary" />
                  <span className="font-medium">Quiz Generation</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI-powered quizzes from your study materials
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-secondary/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Rocket className="h-4 w-4 text-secondary" />
                  <span className="font-medium">Smart Flashcards</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Interactive flashcards for better memorization
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-accent/20">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Code className="h-4 w-4 text-accent" />
                  <span className="font-medium">Text Summarizer</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Concise summaries and key points extraction
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-muted">
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">For Everyone</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Students, educators, and lifelong learners
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-2">
              🚀 Hackathon Demo Project
            </Badge>
            <h2 className="text-2xl font-bold mb-2">
              Transforming Education with AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              StudyBuddy AI demonstrates how artificial intelligence can enhance learning outcomes 
              and make quality education more accessible to everyone, supporting UN SDG 4.
            </p>
          </div>
        </div>

        {/* Main Tools */}
        <Tabs defaultValue="quiz" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px] mx-auto">
            <TabsTrigger value="quiz">Quiz Generator</TabsTrigger>
            <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            <TabsTrigger value="summarizer">Summarizer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quiz">
            <QuizGenerator />
          </TabsContent>
          
          <TabsContent value="flashcards">
            <FlashcardCreator />
          </TabsContent>
          
          <TabsContent value="summarizer">
            <TextSummarizer />
          </TabsContent>
        </Tabs>

        {/* Tech Stack Info */}
        <Card className="mt-12 border-muted">
          <CardHeader>
            <CardTitle className="text-center">Built for Hackathons</CardTitle>
            <CardDescription className="text-center">
              Beginner-friendly tech stack demonstrating AI integration in education
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <Badge variant="outline" className="mb-2">Frontend</Badge>
                <p className="text-sm">React + TypeScript</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Styling</Badge>
                <p className="text-sm">Tailwind CSS</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">Backend</Badge>
                <p className="text-sm">Python Flask/FastAPI</p>
              </div>
              <div>
                <Badge variant="outline" className="mb-2">AI/ML</Badge>
                <p className="text-sm">Hugging Face / OpenAI</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Index;
