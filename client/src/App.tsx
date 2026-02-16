import { Route, Switch } from "wouter";
import { Landing } from "@/pages/Landing";
import { CreateBoard } from "@/pages/CreateBoard";
import { BoardView } from "@/pages/BoardView";
import { ToastContainer } from "@/components/groupboard/ToastContainer";

function App() {
  return (
    <>
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/create" component={CreateBoard} />
        <Route path="/b/:shareCode" component={BoardView} />
        <Route>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-2">404</h1>
              <p className="text-muted-foreground">Page not found</p>
              <a href="/" className="text-primary text-sm hover:underline mt-2 inline-block">Go home</a>
            </div>
          </div>
        </Route>
      </Switch>
      <ToastContainer />
    </>
  );
}

export default App;
