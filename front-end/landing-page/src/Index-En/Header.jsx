import React from 'react';

export default function Header(props) {
  return (
    <header {...props}>
      <div className="header-content">
        <h1>
          <a>
            <span>鲁班H5</span>
          </a>
          <span>移动建站平台</span>
        </h1>
      </div>
    </header>
  );
}
