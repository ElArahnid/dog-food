import cn from 'classnames';
import './styles.css';

function Sort({ defaultSort, tabs = [], selectTypeSort }) {

  const handleSort = (evt, tab) => {
    evt.preventDefault(); 
    selectTypeSort(tab.id);
  }
  return (
    <div className='sort content__sort'>
      {tabs.map(tab => (
        <div 
          key={tab.id}
          id= {tab.id}
          className={cn("sort__link", { "sort__link__selected" : defaultSort === tab.id })}
        >
          <a onClick={(evt) =>
            handleSort(evt, tab)
            }
          >
            {tab.title}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Sort;
