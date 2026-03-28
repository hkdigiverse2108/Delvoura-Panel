import { notification } from "antd";
import { CheckCircleFilled, CloseCircleFilled,ExclamationCircleFilled,} from "@ant-design/icons";
import { createElement } from "react";
import type { NotifyOptions } from "../../Types";


notification.config({ placement: "top", top: 60, duration: 3.5, maxCount: 3,});

const base = (type: "success" | "error" | "warning", opts: NotifyOptions) => {
  const icon = type === "success" ? createElement(CheckCircleFilled) : type === "error" ? createElement(CloseCircleFilled) : createElement(ExclamationCircleFilled);
  notification[type]({ message: opts.description ?? opts.message ?? "Notice", description: undefined, duration: opts.duration ?? 3, className: `app-notification-single-line app-notification-${type}`,icon,style: { borderRadius: 14, width: 380, margin: "0 auto", textAlign: "center",},
  });
};

export const notifySuccess = (text: string) =>base("success", { description: text });
export const notifyError = (text: string) =>base("error", { description: text });
export const notifyWarning = (text: string) =>base("warning", { description: text });