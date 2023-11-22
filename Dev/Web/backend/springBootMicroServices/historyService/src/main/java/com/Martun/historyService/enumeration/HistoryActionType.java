package com.Martun.historyService.enumeration;

public enum HistoryActionType {

    /** FOR ALL USERS **/
    PROFILE_UPDATE,

    /** FOR CLIENTS **/
    PROJECT_POSTING,
    MODIFY_PROJECT,
    CANCEL_PROJECT,
    JOB_APPLICATION_FOR_SPECIFIC_TECH,
    ACCEPT_TECH_JOB_OFFER,
    REJECT_TECH_JOB_OFFER,

    /** FOR TECHNICIAN **/
    SERVICE_PROPOSAL,
    ACCEPT_CLIENT_REQUEST,
    REJECT_CLIENT_REQUEST,
    JOB_COMPLETION,

    /** POUR LES ÉVALUATIONS **/
    USER_RATING,

    /** FOR PAYMENT **/
    // pas encore
}
