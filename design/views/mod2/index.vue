<template>
    <div>
        <header class="wrap-full header">
            <div class="wrap header-main">
                <div class="logo-box">
                    <img src="@/assets/img/logo.png"
                         class="logo"
                         alt="">
                    <img src="@/assets/img/deerLogo.png"
                         class="deer-logo"
                         alt="">
                </div>
                <nav class="top-nav">
                    <ul>
                        <li class="current"><a href="javascript:void(0)">课程学习</a></li>
                        <li><a href="javascript:void(0)">家长中心</a></li>
                        <li><a href="javascript:void(0)">我的订单</a></li>
                        <li><a href="javascript:void(0)">常见问题</a></li>
                    </ul>
                </nav>
                <div>
                    <!--<div class="userinfo-box">
                        <img src="@/assets/img/userImg.jpg" alt="">
                        <div>
                            <span class="stuName">你好！刘伟恒</span>
                            <span class="stuPhone">13696863857</span>
                        </div>
                    </div>-->
                </div>
                <div class="op-box">
                    <a class="stuChange" href="javascript:void(0)">切换孩子</a>
                    <a href="javascript:void(0)" class="outLogin">退出</a>
                    <!--<div class="change-child-box">
                        <div class="border-up">
                            <span></span>
                        </div>
                        <ul class="change-list">
                            <li>
                                <img src="@/assets/img/userImg.jpg">
                                <div class="user-msg-box">
                                    <p class="user-name">刘伟恒</p>
                                    <p class="user-age">4岁三个月</p>
                                </div>
                                <button>点击切换</button>
                            </li>
                            <li>
                                <img src="@/assets/img/userImg.jpg">
                                <div class="user-msg-box">
                                    <p class="user-name">刘伟恒</p>
                                    <p class="user-age">4岁三个月</p>
                                </div>
                                <button class="current">点击切换</button>
                            </li>
                            <li>
                                <img src="@/assets/img/userImg.jpg">
                                <div class="user-msg-box">
                                    <p class="user-name">刘伟恒</p>
                                    <p class="user-age">4岁三个月</p>
                                </div>
                                <button class="current">点击切换</button>
                            </li>
                            <li>
                                <img src="@/assets/img/userImg.jpg">
                                <div class="user-msg-box">
                                    <p class="user-name">刘伟恒</p>
                                    <p class="user-age">4岁三个月</p>
                                </div>
                                <button class="current">点击切换</button>
                            </li>
                            <li>
                                <img src="@/assets/img/userImg.jpg">
                                <div class="user-msg-box">
                                    <p class="user-name">刘伟恒</p>
                                    <p class="user-age">4岁三个月</p>
                                </div>
                                <button class="current">点击切换</button>
                            </li>
                        </ul>
                    </div>-->
                </div>
            </div>
        </header>

        <div class="main-box wrap">
            <div class="aside-left">
                <ul class="aside-left-list">
                    <li class="current">
                        <span class="ico ico-home"></span>
                        <a href="javascript:void(0)">学习首页</a>
                        <span class="triangle"></span>
                    </li>
                    <li>
                        <span class="ico ico-course"></span>
                        <a href="javascript:void(0)">全部课程</a>
                    </li>
                    <li>
                        <span class="ico ico-task"></span>
                        <a href="javascript:void(0)">课程任务</a>
                        <span class="count">5</span>
                    </li>
                    <li>
                        <span class="ico ico-test"></span>
                        <a href="javascript:void(0)">学习测评</a>
                    </li>
                    <li>
                        <span class="ico ico-table"></span>
                        <a href="javascript:void(0)">我的课表</a>
                    </li>
                    <li>
                        <span class="ico ico-child"></span>
                        <a href="javascript:void(0)">孩子中心</a>
                    </li>
                    <li>
                        <span class="ico ico-device"></span>
                        <a href="javascript:void(0)">设备诊断</a>
                    </li>
                </ul>
            </div>
            <div class="main-center">
                <p class="mod-tit">
                    <span class="left-bor"></span>
                    <span class="mod-txt">学习概览</span>
                </p>
                <div class="survey common-bor">
                    <img src="@/assets/img/userImg.jpg" alt="">
                    <div class="student-edit">
                        <div class="stu-name">刘伟恒</div>
                        <a href="javascript:void(0)">编辑</a>
                    </div>
                    <ul class="survey-list">
                        <li>
                            <div class="top"><span class="count">12</span>课节</div>
                            <div class="bottom">已用课节</div>
                        </li>
                        <li>
                            <div class="top"><span class="count">56</span>道</div>
                            <div class="bottom">已练题目</div>
                        </li>
                        <li>
                            <div class="top"><span class="count">12</span>个</div>
                            <div class="bottom">已学单词</div>
                        </li>
                        <li>
                            <div class="top"><span class="count">1</span>个</div>
                            <div class="bottom">学习任务</div>
                        </li>
                    </ul>
                </div>
                <div class="mod-three">
                    <div class="newest-test">
                        <p class="mod-tit">
                            <span class="left-bor"></span>
                            <span class="mod-txt">最新测评</span>
                        </p>
                        <div class="course-box common-bor">
                            <img src="@/assets/img/userImg.jpg"
                                 class="course-img"
                                 alt="">
                            <div class="course-info">
                                <p class="lesson-name">Unit2  AT school 课节进度</p>
                                <p class="course-name">鹿优课课程名称</p>
                                <p class="date">测评时间： 2020-06-24 14:00——2020-06-26 14:00<br>
                                    测评时长： 1小时</p>

                            </div>
                            <div class="op-box">
                                <div class="btn-box">
                                    <button class="btn-disabled btn">进入测评</button>
                                </div>
                                <div class="btn-box">
                                    <button class="btn-orange btn">查看详情</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="go-class">
                        <p class="mod-tit">
                            <span class="left-bor"></span>
                            <span class="mod-txt">即将上课</span>
                        </p>
                        <div class="course-box common-bor">
                            <img src="@/assets/img/userImg.jpg"
                                 class="course-img"
                                 alt="">
                            <div class="course-info">
                                <p class="lesson-name">Unit2  AT school 课节进度</p>
                                <p class="course-name">鹿优课课程名称</p>
                                <p class="date">2020-02-10  18:00-19-19:00</p>
                                <div class="stu-info">
                                    <img src="@/assets/img/userImg.jpg" alt="">
                                    <span>lwh</span>
                                </div>
                            </div>
                            <div class="op-box">
                                <div class="btn-box">
                                    <button class="btn-yellow btn">课前预习</button>
                                    <div class="mark">未完成<span></span></div>
                                </div>
                                <div class="btn-box">
                                    <button class="btn-disabled btn">课后练习</button>
                                </div>
                                <div class="btn-box">
                                    <button class="btn-orange btn">进入教室</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="task">
                        <p class="mod-tit">
                            <span class="left-bor"></span>
                            <span class="mod-txt">最近任务</span>
                        </p>
                        <div class="course-box common-bor">
                            <img src="@/assets/img/userImg.jpg"
                                 class="course-img"
                                 alt="">
                            <div class="course-info">
                                <p class="lesson-name">Unit2  AT school 课节进度</p>
                                <p class="course-name">鹿优课课程名称</p>
                                <p class="date">2020-02-10  18:00-19-19:00</p>
                                <div class="stu-info">
                                    <img src="@/assets/img/userImg.jpg" alt="">
                                    <span>lwh</span>
                                </div>
                            </div>
                            <div class="op-box">
                                <div class="btn-box">
                                    <button class="btn-yellow btn">课前预习</button>
                                    <div class="mark">未完成<span></span></div>
                                </div>
                                <div class="btn-box">
                                    <button class="btn-disabled btn">课后练习</button>
                                </div>
                                <div class="btn-box">
                                    <button class="btn-orange btn">进入教室</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="class-review">
                        <p class="mod-tit">
                            <span class="left-bor"></span>
                            <span class="mod-txt">最近课评</span>
                        </p>
                        <div class="common-bor assessment-box">
                            <div class="course-box">
                                <div class="course-info">
                                    <p class="lesson-name">Unit2  AT school 课节进度</p>
                                    <p class="course-name">鹿优课课程名称</p>
                                    <p class="date">2020-02-10  18:00-19-19:00</p>
                                </div>
                                <ul class="course-score">
                                    <li>
                                        <span>自然拼读</span>
                                        <p>A</p>
                                    </li>
                                    <li>
                                        <span>句子语法</span>
                                        <p>A</p>
                                    </li>
                                    <li>
                                        <span>课堂互动</span>
                                        <p>A</p>
                                    </li>
                                </ul>
                            </div>
                            <div class="teacher-eval-box">
                                <div class="stu-info">
                                    <img src="@/assets/img/userImg.jpg" alt="">
                                    <span>lwh</span>
                                </div>
                                <div class="teacher-eval">
                                    <p class="en">Uses appropriate forms (my/your/his/her/someone’s) to indicate ownership of an object in a conversation; Explains the location of an object using appropriate preposition or prepositional phrase; Describes the appearance of a person (look and outfits) and expresses personal likes and dislike.</p>
                                    <p class="cn">学生能够在一个对话中使用不定代词（我的/你的/他的/她的/某人的）表示物体的所有权；学生能够使用适当的介词或者介词短语来表达物体的位置；学生也能够描述出一个人的外在形象（外貌和服装）并能表达个人的喜好。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="aside-right">
                <div class="stu-evaluate">
                    <img src="@/assets/img/test-entry.png" alt="">
                </div>
                <div class="xcx-box">
                    <img src="@/assets/img/ewm-xcx.png" alt="">
                </div>
                <div class="gzh-box">
                    <img src="@/assets/img/ewm-gzh.png" alt="">
                </div>
                <div class="app-box">
                    <img src="@/assets/img/ewm-app.png" alt="">
                </div>
            </div>
        </div>
        <footer class="footer">
            <p>版权所有©2017-2019 www.deerclass.com lnc.保留所有权利 福州至一教育科技有限公司</p>
            <p>备案号：闽ICP备17016634号-2 公司电话：0591-83476946 公司地址：福建省福州市鼓楼区杨桥中路145号杨桥花园2#楼4层06室</p>
        </footer>
    </div>
</template>

<script>

</script>

