
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Send, MapPin } from "lucide-react";

const Community = () => {
  const [newComment, setNewComment] = useState("");
  
  // Mock posts data
  const postsData = [
    {
      id: 1,
      author: "John Farmer",
      avatar: "JF",
      location: "Green Valley",
      time: "2 hours ago",
      content: "Has anyone else seen a frost warning for tomorrow? Should I cover my tomato plants tonight?",
      likes: 5,
      comments: [
        {
          author: "Mary Gardner",
          avatar: "MG",
          content: "Yes, I got the alert too! I'm going to cover my vegetables this evening.",
          time: "1 hour ago"
        }
      ]
    },
    {
      id: 2,
      author: "Sarah Fields",
      avatar: "SF",
      location: "Riverside County",
      time: "Yesterday",
      content: "Planning to harvest corn this weekend. The forecast looks good, but has anyone heard about possible rain?",
      likes: 12,
      comments: [
        {
          author: "Tom Wilson",
          avatar: "TW",
          content: "I checked the forecast and it shows clear skies for the weekend. Should be perfect harvesting weather!",
          time: "10 hours ago"
        },
        {
          author: "Lisa Johnson",
          avatar: "LJ",
          content: "My weather app shows a 20% chance of light rain on Sunday afternoon, but Saturday looks perfect.",
          time: "8 hours ago"
        }
      ]
    }
  ];
  
  const handleCommentSubmit = (postId: number) => {
    console.log(`Submitting comment for post ${postId}: ${newComment}`);
    setNewComment("");
    // In a real app, this would add the comment to the post
  };
  
  const handleLike = (postId: number) => {
    console.log(`Liked post ${postId}`);
    // In a real app, this would increment the like count
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Post</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
                <DialogDescription>
                  Share your farming questions or observations with the community.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Posting from: Green Valley</span>
                </div>
                <Textarea
                  placeholder="What's on your mind about farming today?"
                  className="h-24"
                />
              </div>
              <DialogFooter>
                <Button type="submit">Post</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="space-y-6">
          {postsData.map((post) => (
            <Card key={post.id} className="p-4">
              <div className="flex items-start space-x-3 mb-3">
                <Avatar>
                  <AvatarFallback>{post.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{post.author}</h3>
                    <div className="flex items-center ml-2 text-xs text-gray-500">
                      <MapPin size={12} className="mr-1" />
                      <span>{post.location}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{post.content}</p>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleLike(post.id)}
                  className="text-gray-600"
                >
                  <ThumbsUp size={18} className="mr-1" />
                  <span>{post.likes}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600"
                >
                  <MessageSquare size={18} className="mr-1" />
                  <span>{post.comments.length}</span>
                </Button>
              </div>
              
              {post.comments.length > 0 && (
                <div className="mt-4 space-y-3">
                  {post.comments.map((comment, i) => (
                    <div key={i} className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">{comment.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex gap-2 items-baseline">
                            <h4 className="text-sm font-medium">{comment.author}</h4>
                            <span className="text-xs text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-sm text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-4 flex items-center space-x-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="text-sm"
                />
                <Button 
                  size="icon" 
                  onClick={() => handleCommentSubmit(post.id)}
                  disabled={!newComment.trim()}
                >
                  <Send size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Community;
