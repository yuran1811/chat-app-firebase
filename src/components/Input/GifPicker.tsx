import { FC, useRef, useState } from 'react';
import Spin from 'react-cssfx-loading/src/Spin';

import { useFetch } from '@/hooks/useFetch';
import configs from '@shared/configs';
import ClickAwayListener from '../ClickAwayListener';

interface GifPickerProps {
  onClickAway: (e: any) => void;
  onSelect: (gif: any) => void;
}

const GifPicker: FC<GifPickerProps> = ({ onClickAway, onSelect }) => {
  const [searchInputValue, setSearchInputValue] = useState('');

  const timeOutRef = useRef<any>(null);

  const { data, loading, error } = useFetch(`giphy-${searchInputValue}`, () =>
    fetch(
      searchInputValue.trim()
        ? `https://api.giphy.com/v1/gifs/search?api_key=${
            configs.giphyAPIKey
          }&q=${encodeURIComponent(searchInputValue.trim())}&limit=25&offset=0`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${configs.giphyAPIKey}&limit=25&offset=0`,
    ).then((res) => res.json()),
  );

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      {(ref) => (
        <div
          ref={ref}
          className="absolute left-[-92px] bottom-full flex h-96 w-96 flex-col items-stretch rounded-lg border-2 border-dark-lighten bg-[#222222] p-4 shadow-2xl"
        >
          <div className="relative">
            <input
              onChange={(e) => {
                if (timeOutRef.current) clearTimeout(timeOutRef.current);
                timeOutRef.current = setTimeout(() => {
                  setSearchInputValue(e.target.value);
                }, 500);
              }}
              type="text"
              className="w-full rounded-full bg-dark-lighten py-2 pl-10 pr-4 outline-none"
              placeholder="Search..."
            />
            <i className="bx bx-search absolute top-1/2 left-3 -translate-y-1/2 text-xl"></i>
          </div>

          {loading ? (
            <div className="flex flex-grow items-center justify-center">
              <Spin />
            </div>
          ) : error ? (
            <div className="flex flex-grow flex-col items-center justify-center">
              <p className="text-center">Sorry... Giphy has limited the request</p>
            </div>
          ) : (
            <div className="mt-3 flex flex-grow flex-wrap gap-2 overflow-y-auto">
              {!!data &&
                !!(data as any)?.data &&
                (data as any).data.map((item: any) => (
                  <img
                    key={item.id}
                    onClick={(e) => {
                      onSelect(item?.images?.original?.url);
                      onClickAway(e);
                    }}
                    className="h-[100px] flex-1 cursor-pointer object-cover"
                    src={item?.images?.original?.url}
                    alt={item?.title}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </ClickAwayListener>
  );
};

export default GifPicker;
