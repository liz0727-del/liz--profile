import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage, t } from '../../contexts/LanguageContext';
import { translations } from '../../i18n/translations';
import Project1Detail from './Project1Detail';
import Project2Detail from './Project2Detail';
import Project3Detail from './Project3Detail';

/**
 * DetailPage - 详情页路由分发
 * 
 * 根据 type 和 id 渲染对应的详情组件
 */
function DetailPage() {
    const { type, id } = useParams();
    const { language } = useLanguage();

    // Project 1 专属详情页
    if (type === 'project' && id === '1') {
        return <Project1Detail />;
    }

    // Project 2 专属详情页
    if (type === 'project' && id === '2') {
        return <Project2Detail />;
    }

    // Project 3 专属详情页
    if (type === 'project' && id === '3') {
        return <Project3Detail />;
    }

    // 通用占位页面
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-paper">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* 返回按钮 */}
                <Link
                    to="/"
                    className="inline-block px-6 py-2 border border-ink/20 rounded-full hover:bg-ink/5 transition-colors"
                >
                    {t(translations.detail.backToHome, language)}
                </Link>

                {/* 占位内容 */}
                <div className="p-12 rounded-2xl border border-ink/10 bg-white/50">
                    <h1 className="font-ndot text-3xl uppercase mb-4">
                        {type === 'creator' ? t(translations.detail.creatorProfile, language) : t(translations.detail.projectDetail, language)}
                    </h1>
                    <p className="text-ink/60 font-mono">
                        This is a placeholder page for <strong>{type} #{id}</strong>.<br />
                        {t(translations.detail.placeholder, language)}
                    </p>
                </div>

                {/* 页面类型标识 */}
                <div className="text-sm text-ink/40 font-mono">
                    Type: {type} | ID: {id}
                </div>
            </div>
        </div>
    );
}

export default DetailPage;

