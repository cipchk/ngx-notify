import { HolderOptions } from './holder.options';
import { Notify } from './notify.type';

export interface NotifyEvent {
  command: string;
  id?: string;
  notify?: Notify;
  add?: boolean;
  holderOptions?: HolderOptions;
}
