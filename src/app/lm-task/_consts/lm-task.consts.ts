
export const MD_NAME = '%clm-task: ';
export const MD_COLOR = 'color: ForestGreen; font-weight: bold';

const RB_LM_TASK = 'lm-task';

// const RB_* - Route branch.
// const RP_* - Route parameter.
// const RT_* - Route.
//
export const L_TASK_LIST = 'List of tasks';
export const RB_LIST = 'list';
// router - "/lm-task/list"
export const RT_LM_TASK_LIST = '/' + RB_LM_TASK + '/' + RB_LIST;
//
export const RB_VIEW = 'view';
// router - "/lm-task/view"
export const RT_LM_TASK_VIEW = '/' + RB_LM_TASK + '/' + RB_VIEW;
//
export const L_INFO = 'Info';
export const RP_TASK_ID = 'taskId';
export const RB_INFO = 'info';
// router - "/:taskId/info"
export const RB_TASK_ID_INFO = ':' + RP_TASK_ID + '/' + RB_INFO;
// router - "/lm-task/view/:taskId/info"
export const RT_LM_TASK_VIEW_TASK_ID_INFO = RT_LM_TASK_VIEW + '/' + RB_TASK_ID_INFO;
//
