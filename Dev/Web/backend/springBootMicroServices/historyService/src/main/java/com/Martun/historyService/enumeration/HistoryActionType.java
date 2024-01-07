package com.Martun.historyService.enumeration;

public enum HistoryActionType {

    /** FOR CLIENTS **/
    CREATE_DEMANDE,/*Done*/
    DELETE_DEMANDE,
    ACCEPT_TECH_JOB_OFFER,
    REJECT_TECH_JOB_OFFER,

    /** FOR TECHNICIAN **/
    SERVICE_PROPOSAL,
    ACCEPT_CLIENT_REQUEST,
    REJECT_CLIENT_REQUEST,

    /** POUR LES ÉVALUATIONS **/
    USER_RATING,/* done */

}
