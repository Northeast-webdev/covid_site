import Footer from "./components/Footer";
import Header from "./components/Header";
import Content from "./components/Content";
function App() {
  return (
    <div>
      <Header />
      <div className="container m-auto">
        <Content />
      </div>
      <Footer />
    </div>
  );
}

export default App;
