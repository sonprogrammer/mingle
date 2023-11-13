import { Input, Select } from "antd";
import { styled } from "styled-components";

const { Search } = Input;
export const StyledSearch = styled(Search)`
    margin: 32px 0;
    width: 40%;
    .ant-input-search-button {
        background: #9b59b6;
        &:hover {
            background: #b165cf !important;
        }
        &:focus {
            background: #9b59b6 !important;
        }
    }
    .ant-input {
        &:hover {
            border-color: #9b59b6;
        }
        &:focus {
            border-color: #9b59b6;
        }
        padding: 12px 10px;
        font-size: 16px;
    }
    .ant-input-group-addon {
        background: #9b59b6 !important;
        color: #fff;
        border: none;
    }
    .ant-btn-icon {
        margin-top: 10px;
    }
`;
export const StyledSelect = styled(Select)`
    .ant-select-selector {
        color: #fff !important;
        font-weight: bold;
    }
    .ant-select-arrow {
        color: #fff !important;
    }
`;