import React from 'react';
import './SideNavbar.css';

function SideNavbar({ categories, onSelectCategory }) {
  return (
    <div className="sidebar">
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.id}
            className="category-item"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavbar;
/*import React from 'react';
import './Sidebar.css';

function SideNavbar({ categories, onSelectCategory }) {
  return (
    <div className="sidebar">
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category.id}
            className="category-item"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNavbar;*/
