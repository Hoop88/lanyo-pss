���ܼ��
��Դ���������������˲�Ʒ�ɹ����ճ����ۡ�����������ȹ���Ϊһ�壬��һ�����ܱȽϼ��Ľ�����ϵͳ����Դ���빩���Ŀ�Դ������ѧϰ�о�ʹ�á�
��ϵͳ�漰���ļ�����Spring2.5�����ϡ�JPA1.0�����ϡ� Hibernate 3.2�����ϡ� EasyJWeb 1.2�����ϡ�ExtJS2.2�����ϡ�LanyoRIA 1.0�����ϡ�
��ʼ�û�����admin ���룺admin


�ļ�˵��

1��db\mysql\lanyopss.sql��mysql���ݿ��ļ��ű���ʹ��mysql -uroot -p  lanyopss< db\mysql\lanyopss.sql���Ƶ�������Ե����ʼ���ݡ�
2��src\main\webappĿ¼ΪWEB��Ŀ¼��
3��src\main\javaĿ¼Ϊϵͳ��javaԴ����Ŀ¼��
4��src\main\resourcesĿ¼Ϊ��Դ�ļ���


��װ˵��
1����tomcat��server.xml�ļ����������������ã�ȷ��docBaseָ���ѹ��webappĿ¼��

Context path="" docBase="D:\usr\lanyo-pss\trunk\code\src\main\webapp" />

2���޸�WEB-INF\classes\db.properties�ļ��е����ݿ�����
database.password=������ݿ�����
database.username=������ݿ��û���

3������һ����Ϊlanyopss�����ݿ⣬Ȼ����db\mysql\lanyopss.sql�ļ��е��������ݡ�

4������tomcat���ڵ�ַ������http://localhost:8080/���ɽ���ϵͳ��

��װ˵�����Բο���Ƶ�������������¼www.lanyotech.com��
