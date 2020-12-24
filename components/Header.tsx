import { FC } from 'react'

const Header: FC<{}> = ({ children }) => {
  return (
    <>
      <style jsx>{`
        header {
          top: 0;
          position: fixed;

          color: var(--theme-text);
          border-bottom: 1px solid var(--theme-border);

          padding: 4px 0px;
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
      <header>{children}</header>
    </>
  )
}

export default Header
