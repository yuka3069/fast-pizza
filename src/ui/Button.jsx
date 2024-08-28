import { Link } from "react-router-dom";

function Button({ children, disabled, type, to, onClick }) {
  const base =
    "inline-block rounded-full bg-yellow-400 tracking-wide text-stone-700 ring-yellow-300 transition-colors duration-100 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ";
  const styles = {
    primary: base + "px-4 py-3 text-sm font-semibold md:px-6 md:py-4 ",
    small: base + "px-4 py-2 text-sm font-semibold md:px-5 md:py-2.5",
    round: base + "px-2.5 py-1 text-xl font-bold md:px-3.5 md:py-2 ",
    secondary:
      "px-4 py-2.5 border-2 border-stone-300 inline-block rounded-full bg-stone-100 font-semibold tracking-wide text-stone-700 ring-stone-300 transition-colors duration-100 hover:bg-stone-200 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed text-sm md:px-6 md:py-4 ",
  };
  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );
  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;
