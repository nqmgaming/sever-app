import { menu } from '../../../admin/index.js';
import { useEnvironmentVariableToDisableActions } from '../../../admin/features/useEnvironmentVariableToDisableActions.js';
import { ResourceFunction } from '../../../admin/types/index.js';
import { FavoriteModel } from '../models/index.js';

export const FavoriteResource: ResourceFunction<typeof FavoriteModel> = () => ({
  resource: FavoriteModel,
  features: [useEnvironmentVariableToDisableActions()],
  options: {
    navigation: menu.mongoose,
    actions: {
      show: {
        showInDrawer: true,
      },
      edit: {
        showInDrawer: true,
      },
      new: {
        showInDrawer: true,
      },
    },
    properties: {
      _id: {
        isTitle: true,
      },
    },
  },
});
