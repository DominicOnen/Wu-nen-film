import Nav from './Nav';
import Footer from './Footer';
import CursorDot from './CursorDot';

export default function Layout({ children, hideFooter = false }) {
  return (
    <>
      <div className="grain"></div>
      <CursorDot />
      <Nav />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  );
}
