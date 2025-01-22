import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { FC } from 'react';

interface EmojiPickerProps {
  onSelect: (emoji: any) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onSelect }) => <Picker data={data} onEmojiSelect={onSelect} />;

export default EmojiPicker;
