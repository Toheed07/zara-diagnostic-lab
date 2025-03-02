import { Nav } from "./components";
import {
  CustomerReviews,
  Footer,
  Hero,
  PopularProducts,
  Services,
  SpecialOffer,
  Subscribe,
  SuperQuality,
  Team,
  Gallery,
} from "./sections";

const App = () => {
  return (
    <main className="relative">
      <Nav />
      <section className="xl:padding-l wide:padding-r">
        <Hero />
      </section>
      <section className="">
        <PopularProducts />
      </section>
      <section className="padding-x">
        <SuperQuality />
      </section>
      <section className="padding-x">
        <Services />
      </section>
      <section className="padding">
        <SpecialOffer />
      </section>
      <section className="">
        <Team />
      </section>
      <section className="">
        <Gallery />
      </section>
      <section className="bg-pale-blue padding">
        <CustomerReviews />
      </section>
      <section className="padding-x sm:py-16 py-8 w-full">
        <Subscribe />
      </section>
      <section className=" bg-black padding-x padding-t pb-8">
        <Footer />
      </section>
    </main>
  );
};

export default App;
