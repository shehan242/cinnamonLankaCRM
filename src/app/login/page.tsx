
'use client';

import { useState } from 'react';
import { useAppStore, UserRole } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { toast } from '@/hooks/use-toast';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@cinnamon.com');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState<UserRole>('ADMIN');
  const { login, companySettings } = useAppStore();
  const router = useRouter();
  const defaultLogo = PlaceHolderImages.find(img => img.id === 'app-logo')?.imageUrl || '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, role, password);
    if (success) {
      toast({ title: "Welcome back!", description: "Logged in successfully." });
      router.push('/dashboard');
    } else {
      toast({ 
        title: "Login Failed", 
        description: "Invalid email, role, or password for this account.", 
        variant: "destructive" 
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4 bg-[url('https://picsum.photos/seed/spice/1920/1080?blur=10')] bg-cover relative">
      <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" />
      
      <Card className="w-full max-w-md relative z-10 shadow-2xl border-none overflow-hidden rounded-2xl">
        <div className="bg-primary/5 h-2 w-full absolute top-0" />
        <CardHeader className="text-center space-y-2 pb-2">
          <div className="mx-auto w-32 h-32 bg-white rounded-3xl flex items-center justify-center p-3 shadow-2xl mb-4 border border-primary/10 overflow-hidden transition-transform hover:scale-105 duration-300">
            <Image 
              src={companySettings.logo || defaultLogo} 
              alt={companySettings.name} 
              width={110} 
              height={110} 
              className="object-contain"
              priority
            />
          </div>
          <CardTitle className="text-3xl font-bold text-primary tracking-tight">{companySettings.name}</CardTitle>
          <CardDescription className="text-xs uppercase tracking-widest font-bold opacity-70">Secured Business Portal</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-4 px-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email / ID</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="john@cinnamonlanka.com" 
                className="h-11 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                className="h-11 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Access Role</Label>
              <Select value={role} onValueChange={(v: UserRole) => setRole(v)}>
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                  <SelectItem value="SUB_ADMIN">Sub-Admin</SelectItem>
                  <SelectItem value="STAFF">Operations Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-2 px-8 pb-10">
            <Button type="submit" className="w-full h-12 text-lg font-bold shadow-xl rounded-xl">Sign In</Button>
            <p className="text-[10px] text-center text-muted-foreground font-medium italic opacity-60">
              Powered by CinnamonLink Pro | Sri Lanka
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
