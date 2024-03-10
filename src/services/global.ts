import { syncBus } from '@/database/core';
import { GlobalServerConfig } from '@/types/settings';
import { StartDataSyncParams } from '@/types/sync';

import { API_ENDPOINTS } from './_url';

const VERSION_URL = 'https://registry.npmmirror.com/@lobehub/chat';

class GlobalService {
  /**
   * get latest version from npm
   */
  getLatestVersion = async (): Promise<string> => {
    const res = await fetch(VERSION_URL);
    const data = await res.json();

    return data['dist-tags']?.latest;
  };

  getGlobalConfig = async (): Promise<GlobalServerConfig> => {
    const res = await fetch(API_ENDPOINTS.config);

    return res.json();
  };

  enabledSync = async (params: StartDataSyncParams) => {
    if (typeof window === 'undefined') return false;

    await syncBus.startDataSync(params);
    return true;
  };

  reconnect = async (params: StartDataSyncParams) => {
    if (typeof window === 'undefined') return false;

    await syncBus.reconnect(params);
    await syncBus.manualSync();
    return true;
  };
}

export const globalService = new GlobalService();
