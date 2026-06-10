# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createStory, getMyStories, updateStoryStatus, deleteStory } from '@dataconnect/generated';


// Operation CreateStory:  For variables, look at type CreateStoryVars in ../index.d.ts
const { data } = await CreateStory(dataConnect, createStoryVars);

// Operation GetMyStories: 
const { data } = await GetMyStories(dataConnect);

// Operation UpdateStoryStatus:  For variables, look at type UpdateStoryStatusVars in ../index.d.ts
const { data } = await UpdateStoryStatus(dataConnect, updateStoryStatusVars);

// Operation DeleteStory:  For variables, look at type DeleteStoryVars in ../index.d.ts
const { data } = await DeleteStory(dataConnect, deleteStoryVars);


```