import logo from "./../resources/logo.png";
import addIcon from "./../resources/add.png";

function Header() {
  return (
    <div className="header">
      <svg className="web_ava">
        <image href={logo} className="app-logo" />
      </svg>
      <form className="search">
        <input
          type="text"
          className="search_field"
          placeholder="Search for recipes"
        ></input>
        <button type="submit" className="btn search_btn">
          Search
        </button>
      </form>

      <nav className="nav">
        <ul className="nav_list">
          <li className="nav_item">
            <button type="submit" className="nav_btn nav_btn_add_recipe">
              <svg className="nav_icon">
                <image href={addIcon} className="add-icon" />
              </svg>
              <span>Add recipe</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
