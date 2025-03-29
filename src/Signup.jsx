import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Link,useNavigate} from "react-router-dom"
import { Quiz } from "./AllRoutes"
import { useContext } from "react"
export function Signup() {
    const{password,setPassword,mail,setMail}=useContext(Quiz)
    const navigate=useNavigate()
    const LogUser=(e)=>{
        e.preventDefault()
       
        
        localStorage.setItem("userdata",JSON.stringify({password:password,mail:mail}))
        
        navigate("/sel")
        
    }
  return (
    <div className={cn("flex flex-col items-center min-h-screen p-4")}>
  <Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle className="text-xl sm:text-2xl">Login</CardTitle>
      <CardDescription>
        Enter your email below to login to your account
      </CardDescription>
    </CardHeader>
    <CardContent>
      <form onSubmit={LogUser}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={mail}
              onChange={(e)=>setMail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              
            </div>
            <Input id="password" type="password" required  value={password}
              onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          have an account?{" "}
          <Link to="/"className="underline underline-offset-4">
             login in
          </Link>
        </div>
      </form>
    </CardContent>
  </Card>
</div>

  )
}
export default Signup;
