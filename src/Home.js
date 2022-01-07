import axios from "axios";
import Navbar from './Component/Navbar'
import TransactionList from "./Component/TransactionList";
function Home() {

  return (
    

    <main id="main" class="main">
      <div>
        <TransactionList/>
      </div>
    </main>
  );
}

export default Home;
