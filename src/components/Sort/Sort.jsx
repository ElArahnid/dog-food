import { useCallback, useState } from 'react';
import cn from 'classnames';
import s from './style.module.css';

function Sort({ tabs = [], selectTypeSort }) {

  const [selectedTab, setSelectedTab] = useState()

  const handleSort = useCallback((evt, tab) => {
    // evt.preventDefault(); 
    selectTypeSort(tab.id);
    setSelectedTab(tab.id);
    // console.log(evt.target.innerText + ' <-- evt', tab.id + ' <-- tab');
  }, [selectTypeSort])
  
// console.log(selectedTab);

  return (
    <div className={cn(s.sort, s.content__sort)}>
      {tabs.map(tab => (
        <div 
          key={tab.id}
          id= {tab.id}
          className={cn(
            s.sort__link, 
            {[s.sort__link_selected] : tab.id === selectedTab}
            )
          }
        >
          <span onClick={(evnt) =>
            handleSort(evnt, tab)
            }
          >
            {tab.title}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Sort;
