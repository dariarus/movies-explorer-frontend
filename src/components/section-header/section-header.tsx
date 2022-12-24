import React, {FunctionComponent} from 'react';

import sectionHeaderStyles from './section-header.module.css';

export const SectionHeader: FunctionComponent<{header: string}> = (props) => {
  return (
    <>
      <h2 className={sectionHeaderStyles.header}>
        {props.header}
      </h2>
      <hr className={sectionHeaderStyles.decor}/>
    </>
  )
}