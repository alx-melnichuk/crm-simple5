
export const MD_NAME = '%clm-client: ';
export const MD_COLOR = 'color: DodgerBlue; font-weight: bold';

const RB_LM_CLIENT = 'lm-client';

// const RB_* - Route branch.
// const RP_* - Route parameter.
// const RT_* - Route.
//
export const L_CLIENT_LIST = 'List of clients';
export const RB_LIST = 'list';
// router - "/lm-client/list"
export const RT_LM_CLIENT_LIST = '/' + RB_LM_CLIENT + '/' + RB_LIST;
//
export const RB_VIEW = 'view';
// router - "/lm-client/view"
export const RT_LM_CLIENT_VIEW = '/' + RB_LM_CLIENT + '/' + RB_VIEW;
//
export const L_INFO = 'Info';
export const RP_CLIENT_ID = 'clientId';
export const RB_INFO = 'info';
// router - "/:clientId/info"
export const RB_CLIENT_ID_INFO = ':' + RP_CLIENT_ID + '/' + RB_INFO;
// router - "/lm-client/view/:clientId/info"
export const RT_LM_CLIENT_VIEW_CLIENT_ID_INFO = RT_LM_CLIENT_VIEW + '/' + RB_CLIENT_ID_INFO;

export const L_TASK_LIST = 'Task list';
export const RB_TASK_LIST = 'task-list';
// router - "/:clientId/task-list"
export const RB_CLIENT_ID_TASK_LIST = ':' + RP_CLIENT_ID + '/' + RB_TASK_LIST;
// router - "/lm-client/view/:clientId/tasks"
export const RT_LM_CLIENT_VIEW_CLIENT_ID_TASKS = RT_LM_CLIENT_VIEW + '/' + RB_CLIENT_ID_TASK_LIST;
//
