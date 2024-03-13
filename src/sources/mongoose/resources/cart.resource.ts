import { menu } from '../../../admin/index.js';
import { useEnvironmentVariableToDisableActions } from '../../../admin/features/useEnvironmentVariableToDisableActions.js';
import { CartModel } from '../models/cart.model.js';
import { ResourceFunction } from 'src/admin/types/index.js';

export const CreateCartResource: ResourceFunction<typeof CartModel> = () => ({
  resource: CartModel,
  features: [useEnvironmentVariableToDisableActions()],
  options: {
    navigation: menu.mongoose,
    properties: {
      _id: {
        isTitle: true,
      },
    },
  },
});
